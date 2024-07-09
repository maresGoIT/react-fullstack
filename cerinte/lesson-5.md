---
title: lesson-5.md
description: 
tags:
  - 
---
# Lecția №5

## Ciclu de viață
[Link Diagrama](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

### Sarcina №1

Arată metodele standard ale ciclului de viață al unui component în clase

### Sarcina №2

Toate colecțiile de tutori, orașe, facultăți sunt stocate în localStorage

### Sarcina №3

Citește toate colecțiile de tutori, orașe, facultăți din localStorage la prima încărcare a paginii

```javascript
async componentDidMount() {
    const data = await localStorage.getItem('key')

    if(data) {
        this.setState({
            ...data
        })
    }
}

