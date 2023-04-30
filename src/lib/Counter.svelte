<script>
  import { longpress } from "../actions/longPress";
  export let initialCount = 0;
  export let maxCount = null;

  let count = initialCount;
  $: countState = `You have clicked ${count} times`;
  
  const isMaxCountReached = () => {
    return maxCount !== null && count >= maxCount;
  };

  const handleClick = () => {
    if (isMaxCountReached()) {
      count = 0;
    }
    count += 1;
  };

  const resetCount = () => {
    count = 0;
  };

</script>

<button on:mousedown={handleClick} on:keypress={handleClick}>Clicks: {count}</button>
<p>{countState} <span on:click={resetCount} on:keypress={resetCount}>(resetCount)</span></p>

<style lang="scss">
  @use "src/styles/variables" as *;

  button {
    background-color: $gray-dark;
    color: $gray-light;
    padding: 10px 20px;
    border-radius: $border-radius;
    border: none;
    cursor: pointer;
    &:active {
      animation: ripple 0.5s ease-out;
    }
  }
  p {
    span {
      color: #ff3e00;
      cursor: pointer;
    }
  }
  @keyframes ripple {
    0% {
      background-color: #3f3f3f;
    }
    100% {
      background-color: #2f2f2f;
    }
  }
</style>