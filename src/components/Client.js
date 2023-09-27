import Avatar from "react-avatar";
const Client=(props)=>{
    return (
        <div className="client">
            <Avatar name={props.username} size={44} round="14px" color="blue"/>
            <span className="userName">{props.username}</span>
        </div>
    )
}
export default Client;