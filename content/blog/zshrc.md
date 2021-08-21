---
title: .zshrc config
date: 2021-04-29
tags: [software, zsh, foss, config]
categories: [zsh]
type: post
---

Hier ein paar nette Sachen aus meiner `.zshrc` mit Kommentaren.

```
bindkey "^P" history-beginning-search-backward-end
bindkey "^N" history-beginning-search-forward-end
autoload -U history-search-end
zle -N history-beginning-search-backward-end history-search-end
zle -N history-beginning-search-forward-end history-search-end
```

Das erlaubt mir meine Shell-Historie relativ einfach zu durchsuchen. Ich weis z.B. das ich irgendwas mit `ip addr` machen will und das es ein Befehl ist, den ich in der Vergangenheit schonmal ausgeführt hab. Dann tippe ich `ip ad` und drücke dann <kbd>C-p</kbd> und es kommt bei der Verfollständigung `ip addr show dev eth0 | grep 'inet '` raus.

```
alias -g G=' | grep'
alias -g L=' | bat'
alias -g H=' | head'
alias -g T=' | tail'
```

Diese Aliase erlauben mir die gängigen Pipe-Befehle vereinfacht zu schreiben. So wird aus `ip addr show dev eth0 | grep 'inet '` dann `ip addr show dev eth0 G 'inet '` was ein erhöhter Schreibkomfort ist. [bat](https://github.com/sharkdp/bat) ist übrigens ein ganz netter Ersatz für less. 

