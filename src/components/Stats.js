export default function Stats({ items }) {
  // early return without any calculations
  if (!items.length)
    return (
      <footer>
        <em>Start adding some items to pack !</em>
      </footer>
    );

  // calculations
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  // rendering
  return (
    <footer>
      <em>
        {percentage === 100
          ? "You got everything packed, ready to go !"
          : `You have ${numItems} items on your list, and you have already packed
          ${numPacked} (${percentage}%).`}
      </em>
    </footer>
  );
}
