---
title: Conceitos - Raciocínio, Argumentos e Validade
weight: 1
description: O que é lógica, o que é um argumento, proposições, validade, correção e tipos de argumento.
autores:
  - thallesgsrv
date: 2026-10-15
---

## 1. O que é lógica?

Considere:

1. Pinguins são preto e branco.
2. Alguns programas de TV antigos são preto e branco.
3. **Logo**, alguns pinguins são programas de TV antigos.

Algo está errado, certo? Você sentiu que a conclusão **não segue** das duas primeiras frases. As duas são verdadeiras, mas elas não *obrigam* a terceira. Ter uma característica em comum (ser preto e branco) não faz duas coisas serem a mesma.

O que você acabou de fazer chama-se **raciocínio** (ou **inferência**): partir de informações e extrair uma conclusão.

> [!IMPORTANT]
> **Lógica não estuda *como* o cérebro raciocina** (isso é psicologia/biologia). Ela estuda **se o ponto de partida é uma boa razão para aceitar a conclusão**.

Em uma frase: **lógica é a ciência que estuda quando uma conclusão se segue (é consequência) de certas premissas.**

## 2. Sentenças e proposições

Nem toda frase pode ser verdadeira ou falsa. Compare:

| Frase | Tipo | Pode ser V ou F? |
| --- | --- | --- |
| "Meu carro é verde-escuro." | declarativa | **Sim** |
| "Quantas vezes tenho de te dizer para limpar os pés?" | pergunta | Não |
| "Quem me dera ser milionário..." | desejo | Não |
| "Prometo dizer toda a verdade." | promessa | Não |
| "Ordene o vetor." | ordem | Não |

Só as **sentenças declarativas** (que afirmam algo) interessam à lógica. Quando uma declarativa afirma algo que pode ser julgado V ou F, o **conteúdo** que ela afirma é uma **proposição**.

**Sentença ≠ proposição.** Duas sentenças diferentes podem expressar a mesma proposição:

- "Miau rasgou a cortina."
- "A cortina foi rasgada por Miau."

São duas sentenças (escritas de forma diferente) e **uma** proposição (o fato de Miau ter rasgado a cortina).

> [!TIP]
> **Teste rápido:** dá para responder "é verdade?" ou "é mentira?". Se sim, é proposição. "Qual a hora?" não passa no teste. "$2+2=4$" passa.

## 3. Argumento

Um **argumento** é um grupo de proposições em que algumas, as **premissas**, são oferecidas como razão para aceitar outra, a **conclusão**.

$$
\frac{\text{Premissa 1}\qquad\text{Premissa 2}}{\text{Conclusão}}
$$

Palavras-pista que costumam marcar a conclusão: **logo, portanto, então, assim, por isso**. As premissas costumam vir depois de **porque, pois, já que**.

### Exemplos (e como extrair as premissas)

**Exemplo 1 (clássico, com Java).**

1. Se um programa usa a biblioteca Swing **e** ela não foi importada, então o programa não compila.
2. O programa compilou.
3. O programa usa Swing.

**Portanto**, a biblioteca foi importada.

**Exemplo 2 (as pessoas falam "embaralhado").** *"A senha 12345 não é segura. Explico por quê. Senhas devem ser complexas para serem seguras. A senha 12345 não é complexa."*

- P1: Senhas devem ser complexas para serem seguras.
- P2: A senha 12345 não é complexa.
- **Conclusão** (veio *primeiro* na fala!): a senha 12345 não é segura.

**Exemplo 3 (conclusão implícita).** *"Apenas um de nós dois é culpado. Eu não tenho culpa? Como? O carro daquela senhora bateu em mim por trás. Quem bate por trás tem a culpa."*

- P1: Apenas um de nós dois é culpado.
- P2: A senhora bateu em mim por trás.
- P3: Quem bate por trás é culpado.
- **Conclusão (nunca dita):** a senhora é a culpada.

> [!TIP]
> No dia a dia, a conclusão pode vir no começo, no fim ou ficar subentendida. Treine perguntar: **"o que essa pessoa quer me convencer?"** Isso é a conclusão. O resto são as razões.

## 4. Argumento válido

Esta é **a ideia mais importante de todo o curso**:

> Um argumento é **válido** quando, **em qualquer situação em que as premissas forem verdadeiras, a conclusão também é obrigatoriamente verdadeira.**

Validade é sobre a **forma** do raciocínio, não sobre os fatos. É como o **encanamento**: validade pergunta se o cano está bem ligado, não se a água é limpa.

**Exemplo (válido, mesmo com fatos absurdos):**

1. Todo peixe voa.
2. Nemo é um peixe.
3. Logo, Nemo voa.

Se as duas premissas **fossem** verdade, a conclusão teria que ser verdade. O encanamento está certo. Só que a premissa 1 é falsa.

Daí a distinção:

| Conceito | Significado |
| --- | --- |
| **Válido** | A forma garante: premissas V $\Rightarrow$ conclusão V |
| **Correto** (*sound*) | Válido **e** as premissas são, de fato, verdadeiras |
| **Inválido** | Existe uma situação com premissas V e conclusão F |

**Exemplos:**

- Merge Sort é mais eficiente que Bubble Sort; Bubble Sort é mais eficiente que Bogosort; **logo**, Merge Sort é mais eficiente que Bogosort. **Válido** (o "mais eficiente que" encadeia) e, como as premissas são verdadeiras, também **correto**.
- "Todo programador é nerd. Nerds odeiam videogames. Logo, programadores odeiam videogames." **Válido**, mas **não correto** (premissas falsas).
- "Se choveu, a rua está molhada. A rua está molhada. Logo, choveu." **Inválido!** A rua pode estar molhada por outro motivo (um caminhão-pipa, por exemplo). Esse erro é tão comum que tem nome: *afirmar o consequente*.

> [!WARNING]
> **Válido $\neq$ bom $\neq$ correto.** Um argumento pode ser válido e ter conclusão falsa (se uma premissa for falsa). E uma conclusão verdadeira pode vir de um argumento inválido (por sorte).

## 5. Dedutivo e indutivo

| | **Dedutivo** | **Indutivo** |
| --- | --- | --- |
| A conclusão... | já estava contida nas premissas | diz **mais** do que as premissas |
| Garantia | **total** (se válido) | só **probabilidade** |
| Exemplo | Todo gato é mamífero; Miau é gato; logo, Miau é mamífero. | O sol nasceu ontem e hoje; logo, nascerá amanhã. |

Outros exemplos indutivos: "Sempre que como ovo passo mal; devo ser alérgico." ou "A vacina funcionou em macacos e porcos; funcionará em humanos." **Não são válidos** (não há garantia), mas podem ser **bons** (fortes) como evidência.

**A lógica deste curso é dedutiva**: o que nos interessa é a garantia total.

## 6. Lógica em programas

Um programa também é um raciocínio:

```python
def maximo(a, b):
    if a > b:
        return a
    else:
        return b

x = 3
y = 5
z = maximo(x, y)
```

- P1: `x = 3`. P2: `y = 5`.
- P3 (regra do programa): se `a > b`, retorna `a`; senão, retorna `b`.
- **Conclusão:** como `3 > 5` é falso, cai no `else` e `z = 5`.

Executar o código **é** deduzir. Por isso lógica é a base de verificação de programas.

## Resumo

- **Raciocínio:** das informações à conclusão.
- **Proposição:** o que pode ser V ou F.
- **Argumento:** premissas + conclusão.
- **Válido:** premissas V $\Rightarrow$ conclusão V (sempre). **Correto:** válido + premissas V.
- **Lógica:** o estudo de quando um argumento é válido.

## Exercícios

**Exercício 1.** Quais destas frases são proposições? (Pode haver mais de uma.)

{{< quiz titulo="proposições" >}}
{{< questao >}}
Marque **todas** as frases que são proposições.

- [x] "$7$ é primo."
- [ ] "Feche a porta."
- [x] "Todo número par é divisível por 3."
- [ ] "Que horas são?"
---
São proposições "$7$ é primo" e "todo número par é divisível por 3". Note que a segunda é **falsa**, mas continua sendo proposição: basta poder ser julgada V ou F. "Feche a porta" é uma ordem e "Que horas são?" é uma pergunta.
{{< /questao >}}
{{< /quiz >}}

**Exercício 2.** Ache as premissas e a conclusão: *"Todo mamífero respira. Logo a baleia respira, já que baleias são mamíferos."*

{{< details title="Gabarito" >}}
Premissas: todo mamífero respira; baleias são mamíferos.\
Conclusão: a baleia respira (marcada por "logo").
{{< /details >}}

**Exercício 3.** "Todo gato é mamífero. Miau é gato. Logo, Miau é mamífero." É válido? É correto?

{{< quiz titulo="válido e correto" >}}
{{< questao fixa="true" >}}
Sobre o argumento "Todo gato é mamífero. Miau é gato. Logo, Miau é mamífero.":

- [x] Válido e correto
- [ ] Válido, mas não correto
- [ ] Inválido, mas com conclusão verdadeira
- [ ] Inválido e incorreto
---
**Válido** porque a forma garante a conclusão, e **correto** porque as premissas são, de fato, verdadeiras.
{{< /questao >}}
{{< /quiz >}}

**Exercício 4.** "Todo estudante de computação ama café. Ana ama café. Logo, Ana é estudante de computação." É válido?

{{< quiz titulo="válido ou inválido" >}}
{{< questao >}}
O argumento "Todo estudante de computação ama café. Ana ama café. Logo, Ana é estudante de computação." é:

- [ ] Válido
- [x] Inválido
---
**Inválido.** Ana pode amar café sem estudar computação: as premissas podem ser V com a conclusão F.
{{< /questao >}}
{{< /quiz >}}

**Exercício 5.** Dedutivo ou indutivo? "Todos os cisnes que vi são brancos; logo todos os cisnes são brancos."

{{< quiz titulo="dedutivo ou indutivo" >}}
{{< questao >}}
O raciocínio "Todos os cisnes que vi são brancos; logo todos os cisnes são brancos." é:

- [ ] Dedutivo
- [x] Indutivo
---
Indutivo: a conclusão diz mais do que as premissas. E foi derrubada na prática: existem cisnes negros.
{{< /questao >}}
{{< /quiz >}}
