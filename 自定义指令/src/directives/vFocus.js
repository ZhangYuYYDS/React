export const vFocus = {
    mounted: (el, binding) => {
        console.log(el)
        console.log(binding.value)
        el.focus()
    }
}




