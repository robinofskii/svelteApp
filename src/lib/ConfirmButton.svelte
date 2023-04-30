<script>
  let clicked = false;

  $: if (clicked) {
    setTimeout(() => {
      clicked = false;
    }, 1000);
  }

  const handleConfirm = () => {
    if (clicked) {
      alert("Confirmed!")
      return;
    }
    clicked = true;
  }
</script>

<span on:click={handleConfirm} on:keydown={handleConfirm} class:clicked>
  {#if clicked}
    <p>Are you sure?</p>
  {:else}
    <p>Logout</p>
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
    }

    &.clicked {
      background-color: $primary-color;
      color: $gray-light;
    }
  }
</style>