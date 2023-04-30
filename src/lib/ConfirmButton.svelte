<script>
  export let timeOut = 1500;
  export let onConfirm = () => {
    alert("Confirmed!")
  };
  export let btnText = "Logout";
  export let clickText = "Are you sure?";

  let clicked = false;

  $: if (clicked) {
    setTimeout(() => {
      clicked = false;
    }, timeOut);
  }

  const handleConfirm = () => {
    if (clicked) {
      onConfirm();
      return;
    }
    clicked = true;
  }
</script>

<span on:click={handleConfirm} on:keydown={handleConfirm} class:clicked>
  {#if clicked}
    <p>{clickText}</p>
  {:else}
    <p>{btnText}</p>
  {/if}
</span>

<style lang="scss">
  @use "src/styles/variables" as *;
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    
    cursor: pointer;
    padding: $padding;
    border-radius: $border-radius;
    border: none;
    background-color: $gray-light;

    outline: solid 2px $primary-color;

    p {
      color: $text-color;
      font-weight: bold;
      font-size: 1rem;
      text-align: center;
    }

    &.clicked {
      background-color: $primary-color;
      color: $gray-light;
    }
  }
</style>