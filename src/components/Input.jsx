function Input({label, type, value, onChange}) {
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <input
                type={type}
                className="form-control"
                onChange={onChange}
                value={value || ''}
            />
        </div>
    )
}

export default Input