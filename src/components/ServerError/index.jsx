import './index.css'
const ServerError = () => {
    return (
        <div className="server-error-container">
            <h1 className="server-error-heading">500</h1>
            <p className="server-error-message">Internal Server Error</p>
        </div>
    )
}
export default ServerError;