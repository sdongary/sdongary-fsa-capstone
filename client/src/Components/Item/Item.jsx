
const Item = (props) => {

  return(
    <div className="item-image">
      <img src={props.image} alt=""/>
      <p>{props.name}</p>
      <p>{props.description}</p>
      <p>{props.category}</p>
      <div className="item-inventory">{props.inventory}</div>
      <div className="item-price">{props.price}</div>
    </div>
  )
}

export default Item