import './FlashMessage.css'

export default function FlashMessage({ flash }) {
  if (!flash) return null
  return (
    <div className={`flash flash-${flash.type}`} role="alert">
      {flash.text}
    </div>
  )
}
