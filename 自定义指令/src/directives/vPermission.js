const usersPermissions = ['hr', 'boss', 'user']

export const vPermission = {
    mounted(el, binding) {
        let p = binding.value
        console.log(el)
        console.log('pppp', p)
        let f = usersPermissions.some((item) => {
            console.log('11111', item)
            return p.includes(item)
        })
        if (!f) {
            el.style.display = 'none'
            // el.parentNode && el.parentNode.removeChild(el)
        }
    }
}
