---
title: Estágio 3 - Aplicações da derivada e integrais
weight: 3
rotulo: Tópicos
description: L'Hôpital, gráficos, otimização, primitivas, integral definida, Teorema Fundamental do Cálculo e método da substituição.
autores:
  - thallesgsrv
date: 2026-10-14
---
## A ideia central

Derivar e integrar são **operações inversas**, como multiplicar e dividir:

- **Derivada:** dada a posição, descubra a velocidade.
- **Integral:** dada a velocidade, descubra a posição (ou a área acumulada).

Neste estágio você primeiro fecha as **aplicações da derivada** (L'Hôpital, gráficos e otimização) e depois aprende o *conceito* (primitiva e área), a ferramenta que liga tudo (o **Teorema Fundamental do Cálculo**) e a primeira técnica de cálculo: a **substituição**, que é a regra da cadeia de trás para frente. As demais técnicas ficam para o Estágio 1 de Cálculo 2.

## Mapa do estágio

1. **Regra de L'Hôpital:** limites indeterminados resolvidos com derivadas.
2. **Extremos e gráficos:** máximos, mínimos, crescimento, concavidade e esboço.
3. **Otimização:** problemas de "maior área", "menor custo".
4. **Primitivas e integral indefinida:** "desderivar".
5. **Integral definida e TFC:** somas de Riemann, área e como calcular de verdade.
6. **Método da substituição:** a técnica que resolve a maioria das integrais.

## Bagagem esperada

- **Todas as derivadas** do Estágio 2. Integrar é conferir de qual função aquela é a derivada.
- Regra da cadeia (a substituição é ela ao contrário).
- Notação de somatório $\sum$ (revisada na página de Integral definida).

## Tabela para ter na mão

| Integral | Resultado |
| --- | --- |
| $\int x^n\,dx\ (n\ne-1)$ | $\dfrac{x^{n+1}}{n+1}+C$ |
| $\int\dfrac1x\,dx$ | $\ln\lvert x\rvert+C$ |
| $\int e^x\,dx$ | $e^x+C$ |
| $\int\operatorname{sen}x\,dx$ | $-\cos x+C$ |
| $\int\cos x\,dx$ | $\operatorname{sen}x+C$ |
| $\int\sec^2x\,dx$ | $\operatorname{tg}x+C$ |
| $\int\sec x\operatorname{tg}x\,dx$ | $\sec x+C$ |
| $\int\dfrac1{1+x^2}\,dx$ | $\operatorname{arctg}x+C$ |
| $\int\dfrac1{\sqrt{1-x^2}}\,dx$ | $\operatorname{arcsen}x+C$ |

> [!TIP]
> Qualquer resposta de integral pode ser **conferida derivando**. Se a derivada do seu resultado devolve o integrando, está certo.
