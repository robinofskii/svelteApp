<script>
  import Counter from './lib/Counter.svelte'
  import Button from './lib/Button.svelte'
	import ConfirmButton from './lib/ConfirmButton.svelte';
	import Divider from './lib/Divider.svelte';

  const imagedims = {
    width: 500,
    height: 250
  }
  const imageUrl = `https://picsum.photos/${imagedims.width}/${imagedims.height}`
  const name = 'World'

  const htmlText = 'Here is some example text with some <em>HTML</em> tags'

  let maxCount = 1
  
  let btnSize = 'medium'
</script>

<section>
  <img src={imageUrl} alt="an example placeholder">
  <h1>Hello {name.toLocaleLowerCase()}</h1>
  <p>{@html htmlText}</p>
  <Divider />
  <div class="maxInput">
    <label for="maxCount">Max count:</label>
    <input type="number" id="maxCount" bind:value={maxCount} min="1">
  </div>
  <div class="buttonRow">
    <Counter initialCount={5} maxCount={maxCount}/>
  </div>
  <Divider />
  <div class="buttonRow">
    <Button size={btnSize} hasShadow>Other text</Button>
  </div> 
  <div class="buttonSizeSwitch">
    <label for="btnSize">Button size:</label>
    <select id="btnSize" bind:value={btnSize}>
      <option value="small">Small</option>
      <option value="medium">Medium</option>
      <option value="large">Large</option>
    </select>
  </div>
  <Divider />
  <div class="logoutSection">
    <ConfirmButton />
  </div>

</section>

<style lang="scss">
  @use "src/styles/variables" as *;

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    border-radius: $border-radius;
  }

  h1 {
    color: $text-color;
  }
  img {
    border-radius: $border-radius;
  }
  p {
    color: $text-color;
  }
  .maxInput {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;

    input {
      padding: $padding;
      border-radius: $border-radius;
      border: none;
      background-color: $gray-light;
      color: $text-color;
      font-weight: bold;
      font-size: 1rem;
      width: 10rem;
      text-align: center;
      &:focus {
        outline: solid 2px $primary-color;
      }
    }
  }
  .buttonSizeSwitch {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
    select {
      padding: $padding;
      border-radius: $border-radius;
      border: none;
      background-color: $gray-light;
      color: $text-color;
      font-weight: bold;
      font-size: 1rem;
      width: 10rem;
      text-align: center;
      &:focus {
        outline: solid 2px $primary-color;
      }
    }
  }
  .buttonRow {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 2rem;
  }

  .logoutSection{
    width: 10rem;
  }
</style>