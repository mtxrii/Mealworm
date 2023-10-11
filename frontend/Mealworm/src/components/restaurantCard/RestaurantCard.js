export default function RestaurantCard(props) {
    return (
        <div>
            {props.idx + ". " + props.name}
        </div>
    );
}