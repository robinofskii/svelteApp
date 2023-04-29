<script>
  export let size = 'medium';
  export let hasShadow = false;

  const sizes = {
    small: 'size-sm',
    medium: 'size-md',
    large: 'size-lg'
  }
</script>

<button class={sizes[size]} class:shadow={hasShadow}><slot>Some text</slot></button>

<style lang="scss">
  @use "src/styles/variables" as *;
  button {
    margin: 1em;
    background-color: $primary-color;
    color: $text-color;
    font-weight: bold;
    padding: $padding $padding-large;
    border-radius: $border-radius;
    border: none;
    cursor: pointer;
    &.size-sm {
      padding: $padding $padding;
      font-size: 0.8rem;
    }
    &.size-md {
      padding: $padding $padding-large;
      font-size: 1rem;
    }
    &.size-lg {
      padding: $padding-large $padding-large*2;
      font-size: 1.2rem;
    }
    &.shadow {
      box-shadow: $box-shadow;
    }
    &:active {
      color: $gray-light;
      transition: background-color 0.3s $transition-cubic;
      background-color: scale-color($color: $primary-color, $saturation: 0%, $lightness: -10%, $alpha: 0%);

      &.shadow {
        box-shadow: $box-shadow-inset;
      }
    }
  }
</style>