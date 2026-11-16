---
title: Estágio 1 - Técnicas de integração e integrais impróprias
weight: 1
rotulo: Tópicos
description: Partes, integrais trigonométricas, substituição trigonométrica, frações parciais, estratégia geral, integrais impróprias e testes de comparação.
autores:
  - thallesgsrv
date: 2026-10-14
---

## A ideia central

No Cálculo 1 você integrou o que cabia na tabela e na substituição simples. Aqui a pergunta muda: **diante de uma integral que não está na tabela, qual técnica usar?** Cada técnica é uma "regra de derivação de trás para frente":

- **Por partes:** regra do produto ao contrário.
- **Trigonométricas e substituição trigonométrica:** identidades e triângulos retângulos para fazer raízes e potências sumirem.
- **Frações parciais:** quebrar uma fração de polinômios em pedaços fáceis.

Depois, a segunda metade do estágio vira a pergunta de cabeça para baixo: **e se o intervalo é infinito, ou a função explode?** Aí a integral é definida por limite (integrais impróprias), e muitas vezes basta saber se ela converge, sem calcular a primitiva.

## Mapa do estágio

1. **Integração por partes:** a regra LIATE e exemplos resolvidos.
2. **Integrais trigonométricas:** potências e produtos de seno, cosseno, tangente e secante.
3. **Substituição trigonométrica:** raízes de \(x^2\pm a^2\) e \(a^2-x^2\).
4. **Frações parciais:** quebrar a fração e integrar com \(\ln\) e \(\operatorname{arctg}\).
5. **Integrais impróprias:** limites infinitos e assíntotas, definidas por limites.
6. **Testes de comparação:** descobrir se converge sem achar a primitiva.
7. **Estratégia geral e ferramentas extras:** como escolher a técnica, completar quadrados e problemas mistos.

> [!TIP]
> Se você quer só decidir **qual técnica usar**, vá direto à página 7 depois de ler as técnicas. Ela é o "mapa" de tudo o que vem antes.

## Bagagem esperada

- Tabela de integrais, primitivas e **substituição** (Cálculo 1, Estágio 3).
- Regras de derivação, em especial produto e cadeia.
- Identidades trigonométricas básicas e limites (para as impróprias).

## Tabela para ter na mão

| Integral | Resultado |
| --- | --- |
| \(\int u\,dv\) | \(uv-\int v\,du\) |
| \(\int\dfrac1x\,dx\) | \(\ln\lvert x\rvert+C\) |
| \(\int\dfrac1{1+x^2}\,dx\) | \(\operatorname{arctg}x+C\) |
| \(\int\dfrac1{\sqrt{1-x^2}}\,dx\) | \(\operatorname{arcsen}x+C\) |
| \(\int\sec x\,dx\) | \(\ln\lvert\sec x+\operatorname{tg}x\rvert+C\) |

> [!IMPORTANT]
> Toda resposta de integral indefinida pode ser **conferida derivando**. Se a derivada devolve o integrando, está certo.
