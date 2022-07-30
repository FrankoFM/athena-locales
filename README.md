# Athena-Locales Plugin

## Description

This is a modified version of the [Athena Locales System](https://github.com/Stuyk/altv-athena/tree/master/src/core/shared/locale) to provide a more flexible and easy to use locale system. You can use this plugin for free on your server and edit it to your liking. No need for credits.

## Features

-   Its a plugin so that you dont have to modify the core (prevents merging errors on Athena updates)
-   Each player can play in there native language (given you provide the translation)
-   You can use the placeholder feature in webviews (more infos about that down below)
-   Uses the AgendaSystem to load the players prefered language when he connects

## Usage

### Server

Update the language for a player

```typescript
const wantedLanguage = 'de';
LocalelsServer.setLanguage(player, wantedLanguage);
```

Get the locals for a key (without placeholder)

```typescript
const message = LocalelsServer.get(player, LocalesKeys.EXAMPLE_KEY);
alt.log(message); // Returns: This is an example.
```

Get the locals for a key (with placeholder)

```typescript
const message = LocalelsServer.get(player, LocalesKeys.EXAMPLE_KEY, 'Test');
alt.log(message); // Returns: This is an Test example.
```

### Client

Get the locals for a key (without placeholder)

```typescript
const message = LocalesClient.get(LocalesKeys.EXAMPLE_KEY);
alt.log(message); // Returns: This is an example.
```

Get the locals for a key (with placeholder)

```typescript
const message = LocalesClient.get(LocalesKeys.EXAMPLE_KEY, 'Test');
alt.log(message); // Returns: This is an Test example.
```

### Webview

Get the locals for a key

-   import the LocalesClient and LocalesKeys
-   pack them both in the data object

Like this:

```javascript
data() {
    return {
        LocalesClient,
        LocalesKeys
    };
},

```

And then use it like this:

```html
<div>{{ LocalesClient.get(LocalesKeys.EXAMPLE_KEY) }}</div>
```

```html
<div>{{ LocalesClient.get(LocalesKeys.EXAMPLE_KEY, 'Test') }}</div>
```

You can even make it convert the text to HTML like this:

-   the local:
    `[LocalesKeys.EXAMPLE_KEY]: 'This is an <strong>_%_</strong> example.',`
-   the HTML / Vue:

```html
<div v-html='LocalesClient.get(LocalesKeys.EXAMPLE_KEY), "Test"'/>
```
