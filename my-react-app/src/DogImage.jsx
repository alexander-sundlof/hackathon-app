export default function DogImage({ url }) {
  return (
    <img
      src={url}
      alt="Random dog"
      style={{ borderRadius: "16px", marginTop: "20px" }}
    />
  )
}
