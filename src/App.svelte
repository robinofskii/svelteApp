<script>
  import Counter from './lib/Counter.svelte'
  import Button from './lib/Button.svelte'

  const imagedims = {
    width: 500,
    height: 250
  }
  const imageUrl = `https://picsum.photos/${imagedims.width}/${imagedims.height}`
  const name = 'World'

  const htmlText = 'Here is some example text with some <em>HTML</em> tags'
</script>

<section>
  <img src={imageUrl} alt="an example placeholder">
  <h1>Hello {name.toLocaleLowerCase()}</h1>
  <p>{@html htmlText}</p>
  <div class="buttonRow">
    <Counter initialCount={5} />
  </div>
  <div class="buttonRow">
    <Button size="medium" hasShadow>Other text</Button>
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
  .buttonRow {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 2rem;
  }
</style>