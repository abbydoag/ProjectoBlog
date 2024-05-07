function Input({label, type, value, onChange}) {
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <input
                type={type}
                className="form-control"
                onChange={({target:{value}}) => onChange(value)}
                value={value || ''}
            />
        </div>
    )
}

export default Input