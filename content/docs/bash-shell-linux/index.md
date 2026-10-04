---
title: Bash, Shell e Linux
weight: 20
description: Terminal, scripts em Bash e o básico do Linux.
rotulo: Tópicos
autores:
  - thallesgsrv
date: 2026-10-03
---

## Comandos essenciais do Linux/Bash

| Comando | O que faz |
| --- | --- |
| `pwd` | Mostra o diretório atual em que você está. |
| `ls` | Lista os arquivos e pastas do diretório atual. |
| `ls -la` | Lista tudo, incluindo arquivos ocultos e detalhes de permissões. |
| `cd /caminho` | Entra em um diretório específico. |
| `cd ..` | Volta para o diretório anterior. |
| `mkdir nome` | Cria uma nova pasta. |
| `rmdir nome` | Remove uma pasta vazia. |
| `touch arquivo.txt` | Cria um arquivo vazio. |
| `cp origem.txt destino.txt` | Copia um arquivo para outro local. |
| `mv origem.txt novo.txt` | Move ou renomeia arquivos. |
| `rm arquivo.txt` | Remove um arquivo. |
| `rm -rf pasta/` | Remove uma pasta e tudo dentro dela sem confirmação. |
| `cat arquivo.txt` | Mostra o conteúdo do arquivo. |
| `less arquivo.txt` | Abre o arquivo página por página. |
| `head arquivo.txt` | Mostra as primeiras linhas do arquivo. |
| `tail arquivo.txt` | Mostra as últimas linhas do arquivo. |
| `tail -f arquivo.log` | Mostra o arquivo em tempo real enquanto ele cresce. |
| `grep "texto" arquivo.txt` | Procura um texto dentro de um arquivo. |
| `grep -R "texto" pasta/` | Procura texto recursivamente dentro de uma pasta. |
| `find . -name "*.txt"` | Procura arquivos por nome a partir do diretório atual. |
| `which python` | Mostra onde o comando está instalado. |
| `man ls` | Abre o manual do comando `ls`. |
| `whoami` | Mostra o usuário atual. |
| `id` | Mostra informações do usuário e do grupo. |
| `uname -a` | Mostra informações do sistema operacional. |
| `date` | Mostra a data e a hora. |
| `df -h` | Mostra o uso do disco em formato legível. |
| `free -h` | Mostra o uso de memória. |
| `uptime` | Mostra quanto tempo o sistema está ligado. |
| `ps` | Lista processos em execução. |
| `ps aux` | Lista todos os processos com detalhes. |
| `top` | Mostra processos em tempo real. |
| `kill 1234` | Envia sinal de término ao processo 1234. |
| `kill -9 1234` | Força a finalização do processo. |
| `sudo apt update` | Atualiza a lista de pacotes do sistema. |
| `sudo apt install pacote` | Instala um pacote. |
| `ls -l` | Lista arquivos com detalhes de permissão. |
| `chmod 755 arquivo.sh` | Define permissões do arquivo. |
| `chmod +x arquivo.sh` | Torna o arquivo executável. |
| `chmod u+x arquivo.sh` | Dá permissão de execução ao usuário dono. |
| `chmod go-w arquivo.txt` | Remove permissão de escrita para grupo e outros. |
| `chown usuario:grupo arquivo.txt` | Troca o dono e o grupo do arquivo. |
| `ls | grep pdf` | Filtra a saída de `ls` para mostrar só arquivos com `pdf`. |
| `cat arquivo.txt | wc -l` | Conta quantas linhas o arquivo tem. |
| `echo "teste" > arquivo.txt` | Cria ou sobrescreve um arquivo com o texto. |
| `echo "mais texto" >> arquivo.txt` | Adiciona texto ao final do arquivo. |
| `2> erro.txt` | Redireciona mensagens de erro para um arquivo. |
| `VAR=123` | Cria uma variável com valor. |
| `echo $VAR` | Mostra o valor da variável. |
| `export PATH=$PATH:/usr/local/bin` | Adiciona um caminho ao `PATH`. |
| `clear` | Limpa o terminal. |
| `history` | Mostra os comandos usados recentemente. |
| `!123` | Executa o comando número 123 do histórico. |
| `curl -I https://example.com` | Verifica os cabeçalhos HTTP de um site. |
| `zip -r pacote.zip pasta/` | Compacta uma pasta em um arquivo `.zip`. |
| `unzip pacote.zip` | Extrai um arquivo `.zip`. |
| `tar -czf backup.tar.gz pasta/` | Compacta uma pasta em `.tar.gz`. |
| `tar -xzf backup.tar.gz` | Extrai um arquivo `.tar.gz`. |

## Lista rápida

- `ls` — lista arquivos
- `cd` — entra em pastas
- `mkdir` — cria pasta
- `rm` — remove arquivos
- `cp` — copia
- `mv` — move/renomeia
- `cat` — lê arquivo
- `grep` — busca texto
- `find` — encontra arquivos
- `ps` — processos
- `chmod` — permissões
- `sudo` — privilegio de admin
- `tar` — compacta e extrai
- `curl` — acessa URLs
- `history` — histórico de comandos

## Contribuição

Se você tiver comandos úteis, dicas de terminal ou scripts em Bash, pode contribuir com esta seção.
