---
title: Lectia 1
description: 
tags:
  - 
---
# Lecția №1

## Crearea componentelor (fără stil)

### Task №1

Împărțirea [layout-ului](https://www.figma.com/design/pxX63yDNTayQwyiyen7uUP/Lesson-(English)?node-id=243-1&t=KTPrqtlAgnPUNSnd-0) în componente

**Exemplu**

```jsx
<Sidebar>
<Menu>
<MenuItem>
<Main>
<Paper>
<Card>
<TutorsList>
<Tutor>
<CitiesList>
<City>
<FacultiesList>
<Faculty>
```

### Task №2

Creează un fișier menu.js care va conține o listă cu elementele din meniu

```jsx
export const menuConfig = [
  {
    name: "University",
  },

  {
    name: "Faculties",
  },
];
```

Desenează meniul în sidebar folosind `menuConfig` și arată cum se lucrează cu `props` și `key`

![Meniu](https://github.com/VovaMelnyk/React-tasks/raw/en/images/sidebar.png)

### Task №3

Creează un component ` <Paper>` - un component cu fundal alb și padding care folosește `props.children` și redă orice markup îi este transmis

![Paper](https://github.com/VovaMelnyk/React-tasks/raw/en/images/paper.png)

### Task №4

Desenează componenta card și componenta descriere folosind ` <Paper>` și arată cum să imporți imagini în componentă

Card

![Card](https://github.com/VovaMelnyk/React-tasks/raw/en/images/Card.png)

Descriere

![description](https://github.com/VovaMelnyk/React-tasks/raw/en/images/description.png)

### Task №5

Desenează colecțiile de profesori, orașe, facultăți folosind acest json

```json
{
  "name": "MIT",
  "description": "Experiență, o concentrare de cunoștințe și abilitatea de a evita majoritatea greșelilor de recrutare. Știm ce doresc majoritatea companiilor locale și străine și putem oferi asta. Și ne îmbunătățim constant cursurile de programare, adăugând ceva nou acolo. Puteți vedea poveștile de succes ale absolvenților noștri pentru a vedea eficacitatea metodologiei noastre de predare. Da, vom începe cu bazele și cele mai elementare informații. Știm că majoritatea oamenilor vin la noi fără cunoștințe.",
  "tutors": [
    {
      "firstName": "John",
      "lastName": "Smith",
      "phone": "+1 302-865-7394",
      "email": "johnsmith@goit.global",
      "city": "New York",
      "options": "Creare grup"
    },
    {
      "firstName": "Antonio",
      "lastName": "García",
      "phone": "+34 456 890 302",
      "email": "antonio.garcia@goit.global",
      "city": "Madrid",
      "options": "Creare grup, editare profile profesori"
    }
  ],
  "cities": ["Kyiv", "Londra", "Berlin"],
  "department": [
    { "name": "Facultatea de Științe ale Calculatoarelor" },
    { "name": "Facultatea de Automatizare" },
    { "name": "Facultatea de Rețele Neuronale" }
  ]
}
```

![colecție](https://github.com/VovaMelnyk/React-tasks/raw/en/images/collection.png)

### Task №6

Creează un component universal de buton care va avea 3 props `text`, `icon` și `onClick` (în viitor)

![buton](https://github.com/VovaMelnyk/React-tasks/raw/en/images/button.png)

### Task №7

Fă descrieri programate în toate componentele folosind `propTypes`
