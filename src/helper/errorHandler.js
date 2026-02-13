
export function handleError(error, res) {
    if (error.status) {
        return res.status(error.status).json({
            ok: false,
            message: error.message
        })
    }

    console.error(error)

    return res.status(500).json({
        ok: false,
        message: 'Error interno del servidor'
    })
}
