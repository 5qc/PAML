![PAML Logo](https://repository-images.githubusercontent.com/491334714/441747be-9bce-44e3-9330-0b78ff026b2d)

<h2 align="center">PAML</h2>
<p align="center">Perfectly Awesome Markup Language, an add-on to HTML</p>

# Table of Contents
- [Table of Contents](#table-of-contents)
- [Intro](#intro)
- [Installation](#installation)
- [Usage](#usage)
  - [Variables](#variables)
  - [If Statements](#if-statements)
  - [For Loops](#for-loops)

# Intro
This is the official respository for PAML (Perfectly Awesome Markup Language), a TypeScript-based HTML add-on that adds much more to HTML, such as if statements and variables!

# Installation
You can install PAML through npm (`npm i paml`) or install it into your website with jsDelivr, in which case you would simply implement this code into your website:
```html
<script src="https://cdn.jsdelivr.net/npm/paml" defer></script>
```
or if you want a specific version:
```html
<script src="https://cdn.jsdelivr.net/npm/paml@version" defer></script>
```

# Usage
I don't have a proper documentation setup yet. So for now, it's going to be on here.

## Variables
Variables are very simple to implement and call. To set a variable, simply use the `<set>` tag, like this:
```html
<set name="myVariable">This is the content of my variable.</set>
```
And then to call a variable, it can be done by surrounding text with double curly brackets. Which then the variable would be called like: `{{myVariable}}`. And that should output:
```html
This is the content of my variable.
```

## If Statements
If statements are done by using the `<if>` tag. Currently, as of version 1.0.0, if tags can only be used for selectors and variable names. Both examples will be shown.

For example, the if tag using selectors can be used like this:
```html
<if exists=".example">This content will show if .example exists.</if>
<else>This content will show if .example doesn't exist.</else>
```
And because .example doesn't exist, the content with the `<else>` tag should appear.

If tags can be used for variables like this:
```html
<if exists="{{myVariable}}">myVariable exists.</if>
<else>myVariable doesn't exist.</else>
```

## For Loops
For loops can be used by using the `<for>` tag. It can be used to loop over children in an element. Here is an example:
```html
<div class="parent">
    <div class="child">H</div>
    <div class="child">e</div>
    <div class="child">l</div>
    <div class="child">l</div>
    <div class="child">o</div>
</div>

<for each=".child" in=".parent" varname="item">
    {{i}} {{item}}<br />
</for>
```
And that should output:
```html
0 H
1 e
2 l
3 l
4 o
```
