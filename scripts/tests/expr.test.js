const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const Expr = require(path.join(__dirname, '..', '..', 'themes', 'big-o-library', 'assets', 'graficador', 'expr.js'));

const amb = () => ({ P: { a: 2 }, F: {} });
const avaliar = (texto, x = 0, variavel = 'x', a = amb()) => {
  const { ast } = Expr.analisar(texto, { variavel, linhas: ['f'] });
  return Expr.compilar(ast, a)(x);
};
const perto = (obtido, esperado, tol = 1e-9) => assert.ok(Math.abs(obtido - esperado) < tol, `${obtido} ≠ ${esperado}`);

test('operadores respeitam a precedência e a associatividade', () => {
  assert.equal(avaliar('2+3*4'), 14);
  assert.equal(avaliar('-x^2', 3), -9);
  assert.equal(avaliar('2^3^2'), 512);
  assert.equal(avaliar('2^-x', 2), 0.25);
  assert.equal(avaliar('10-4-3'), 3);
});

test('multiplicação implícita e notação brasileira', () => {
  assert.equal(avaliar('2x', 4), 8);
  assert.equal(avaliar('(x+1)(x-1)', 3), 8);
  assert.equal(avaliar('1,5x', 2), 3);
  assert.equal(avaliar('x²+1', 3), 10);
  perto(avaliar('3sen(x)', Math.PI / 2), 3);
  perto(avaliar('xsenx', 2), 2 * Math.sin(2));
  perto(avaliar('sen x^2', 2), Math.sin(4));
  perto(avaliar('2pi'), 2 * Math.PI);
  perto(avaliar('√(x+1)', 3), 2);
});

test('parâmetros viram variáveis livres e usam o valor atual', () => {
  const { params } = Expr.analisar('a*x + b', { variavel: 'x', linhas: [] });
  assert.deepEqual(Array.from(params).sort(), ['a', 'b']);
  assert.equal(avaliar('ax', 3, 'x', { P: { a: 5 }, F: {} }), 15);
});

test('uma curva pode chamar outra', () => {
  const a = { P: {}, F: { f: x => x * x } };
  assert.equal(avaliar('f(x)+1', 3, 'x', a), 10);
  assert.equal(Array.from(Expr.analisar('f(x)', { variavel: 'x', linhas: ['f'] }).chamadas)[0], 'f');
});

test('raiz ímpar de número negativo é real', () => {
  perto(avaliar('x^(1/3)', -8), -2);
  assert.ok(Number.isNaN(avaliar('x^(1/2)', -4)));
});

test('erros vêm em português e nunca como exceção técnica', () => {
  const casos = { '2+': /terminou/, '(x': /fechar/, 'x)': /sem abrir/, 'x@': /Símbolo/, '|x|': /abs/, '': /Digite/ };
  Object.entries(casos).forEach(([texto, re]) => {
    assert.throws(() => Expr.analisar(texto, { variavel: 'x', linhas: [] }), e => e.amigavel && re.test(e.message), texto);
  });
});

test('str mostra como o texto foi entendido, sem parênteses a mais', () => {
  const ler = t => Expr.str(Expr.analisar(t, { variavel: 'x', linhas: [] }).ast);
  assert.equal(ler('sen x'), 'sen(x)');
  assert.equal(ler('-x^2'), '-x^2');
  assert.equal(ler('(x+1)*2'), '(x + 1)·2');
  assert.equal(ler('2x'), '2·x');
});

test('derivada numérica', () => {
  perto(Expr.derivada(Math.sin, 0), 1, 1e-9);
  perto(Expr.derivada(x => x ** 3, 2), 12, 1e-7);
});

test('integral de Simpson bate com valores exatos de Cálculo 2', () => {
  perto(Expr.integrar(x => x * x, 0, 2), 8 / 3, 1e-6);
  perto(Expr.integrar(Math.sin, 0, Math.PI), 2, 1e-6);
  // comprimento do arco de x^(3/2) em [0, 4]: (8/27)(10^(3/2) - 1)
  const f = x => Math.pow(x, 1.5);
  perto(Expr.integrar(x => Math.sqrt(1 + Expr.derivada(f, x) ** 2), 0, 4), 8 / 27 * (Math.pow(10, 1.5) - 1), 1e-6);
});

test('integrais com singularidade na ponta convergem; as que divergem devolvem NaN', () => {
  perto(Expr.integrar(x => 1 / Math.sqrt(x), 0, 1), 2, 1e-6);
  perto(Expr.integrar(Math.log, 0, 1), -1, 1e-5);
  // superfície de revolução de √x em [0, 1]: (π/6)(5√5 − 1)
  const df = x => Expr.derivada(Math.sqrt, x);
  perto(2 * Math.PI * Expr.integrar(x => Math.sqrt(x) * Math.sqrt(1 + df(x) ** 2), 0, 1), Math.PI / 6 * (5 * Math.sqrt(5) - 1), 1e-5);
  [[x => 1 / x, 0, 1], [x => 1 / x, -1, 1], [x => 1 / (x * x), 0, 1], [Math.tan, 0, Math.PI / 2]].forEach(([fn, a, b]) =>
    assert.ok(Number.isNaN(Expr.integrar(fn, a, b))));
});

test('raízes: acha cruzamentos e descarta assíntotas', () => {
  const r = Expr.raizes(x => x * x - 1, -3, 3);
  assert.equal(r.length, 2);
  perto(r[0], -1, 1e-9);
  perto(r[1], 1, 1e-9);
  assert.deepEqual(Expr.raizes(x => 1 / x, -2, 2), []);
  assert.equal(Expr.raizes(x => (4 - x * x) - (x + 2), -4, 3).length, 2);
});

test('constante aceita expressões sem variável e recusa o resto', () => {
  perto(Expr.constante('pi/2'), Math.PI / 2);
  assert.equal(Expr.constante('2,5'), 2.5);
  assert.throws(() => Expr.constante('k+1'), e => e.amigavel);
});

test('formatar usa vírgula e sinal de menos tipográfico', () => {
  assert.equal(Expr.formatar(1234.5678), '1234,57');
  assert.equal(Expr.formatar(-2), '−2');
  assert.equal(Expr.formatar(0.1 + 0.2), '0,3');
  assert.equal(Expr.formatar(-3.9e-17), '0');
  assert.equal(Expr.formatar(NaN), 'indefinido');
  assert.equal(Expr.formatar(Infinity), '∞');
});
