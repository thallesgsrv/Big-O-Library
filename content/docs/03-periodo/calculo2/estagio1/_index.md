---
title: Estágio 1
weight: 1
description: Técnicas de integração e integrais impróprias, do zero à prova.
rotulo: Tópicos
autores:
  - thallesgsrv
  - hilbertmgomes
date: 2026-10-01
---

Este estágio cobre as **técnicas de integração** (por partes, trigonométricas, substituição trigonométrica e frações parciais) e as **integrais impróprias**. A ideia central é uma só: quando a integral não é imediata, a gente *transforma* ela em outra mais simples.

## Como estudar

Cada tópico segue o mesmo caminho: a ideia em linguagem simples, uma receita em passos, exemplos resolvidos e exercícios com gabarito escondido. **Tente resolver cada exemplo antes de abrir a resolução.** Em Cálculo, ler a solução e achar que entendeu é a armadilha número 1.

## Bagagem esperada

Vem de Cálculo 1. Se algum item abaixo estiver enferrujado, revise antes de começar:

- **Derivadas básicas:** polinômios, \(e^x\), \(\ln x\), seno, cosseno, tangente, \(\operatorname{arctg} x\). Integrar é "desderivar", então quem não deriva bem não integra bem.
- **Regra do produto e regra da cadeia:** a integração por partes é a regra do produto de trás para frente, e a substituição simples é a regra da cadeia de trás para frente.
- **Substituição simples (\(u = \ldots\)):** aparece em *todos* os tópicos como passo final.
- **Limites e L'Hôpital:** necessários nas integrais impróprias.
- **Identidades trigonométricas:** \(\operatorname{sen}^2 x + \cos^2 x = 1\) e \(\operatorname{tg}^2 x + 1 = \sec^2 x\).
- **Álgebra:** completar quadrados, fatorar polinômios, dividir polinômios.

> [!NOTE]
> Usamos a notação brasileira: \(\operatorname{sen}\) (seno), \(\operatorname{tg}\) (tangente) e \(\operatorname{arctg}\) (arco-tangente).

## Tabela para ter na mão

Todas as técnicas terminam caindo numa destas integrais básicas:

| Integral | Resultado |
| --- | --- |
| \(\int x^n\,dx\) (\(n \neq -1\)) | \(\dfrac{x^{n+1}}{n+1} + C\) |
| \(\int \dfrac{1}{x}\,dx\) | \(\ln\lvert x\rvert + C\) |
| \(\int e^x\,dx\) | \(e^x + C\) |
| \(\int \operatorname{sen} x\,dx\) | \(-\cos x + C\) |
| \(\int \cos x\,dx\) | \(\operatorname{sen} x + C\) |
| \(\int \sec^2 x\,dx\) | \(\operatorname{tg} x + C\) |
| \(\int \sec x\operatorname{tg} x\,dx\) | \(\sec x + C\) |
| \(\int \dfrac{1}{1+x^2}\,dx\) | \(\operatorname{arctg} x + C\) |
| \(\int \dfrac{1}{\sqrt{1-x^2}}\,dx\) | \(\operatorname{arcsen} x + C\) |

## Ordem sugerida

Siga a ordem dos tópicos: *Substituição trigonométrica* usa as integrais de *Integrais trigonométricas*, e *Testes de comparação* usa o resultado de *Integrais impróprias*.

## Contribuição

Se você tiver materiais úteis desta disciplina (listas, provas, resumos), pode colaborar com a biblioteca e ajudar a enriquecer esta página.

## Para fechar o estágio

Depois de todos os tópicos, passe pela página **Estratégia geral e ferramentas extras**: ela ensina a *escolher* a técnica certa e traz problemas misturados, que é como a prova cobra.
