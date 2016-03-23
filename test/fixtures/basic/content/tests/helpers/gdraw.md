---
subject: Helper Tests
title: Google Draw
section: helper-tests
pdf: false
--- 

# Google Draw Test 

## Use defaults

You can just provide the `id` and it should work on all mediums.

{@gdraw id="1KA_A79bftHljaekXg5gpG6H--Zn0Tkl6eACMfilu6vE"/}

**Code:**

```html
@gdraw id="..."
```

---

## Using a fixed width

You could provide a fixed `width` for the drawing, which is the way Google Draw
works by default.  

{@gdraw id="1KA_A79bftHljaekXg5gpG6H--Zn0Tkl6eACMfilu6vE" width=678/}

**Code:**

```html
@gdraw id="..." width=678
```

---

## Using a ratio

You can provide a `ratio` parameter that involves a pixel width and height.

{@gdraw id="1KA_A79bftHljaekXg5gpG6H--Zn0Tkl6eACMfilu6vE" ratio="1000:313"/}

**Code:**

```html
@gdraw id="..." ratio="1000:313"
```

---

## Using a height percentage

You can provide a `%` value for the `height`, which is basically another way of
providing a ratio (except with you doing the `h/w` division up-front). 

{@gdraw id="1KA_A79bftHljaekXg5gpG6H--Zn0Tkl6eACMfilu6vE" height="32%"/}

**Code:**

```html
@gdraw id="..." height="32%"
```

---

## Using a fixed height

Providing a fixed height will scale for web and for PDF prinouts, but it will
produce varying amounts of vertical padding around the image depending on the medium.
For this reason, it is not preferred.

{@gdraw id="1KA_A79bftHljaekXg5gpG6H--Zn0Tkl6eACMfilu6vE" height=300/}

**Code:**

```html
@gdraw id="..." height=300
```
  

---

