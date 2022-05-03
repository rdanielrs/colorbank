const filter = require("express").Router()
const User = require("../models/User")

/*filter.get("/user/:id/sort/name", async(req, res) => {
    const id = req.params.id 

    const { paletteName } = req.body

    const user = await User.findById(id, "-password")

    //const sorted = user.user_palettes.filter(filterResult)


    //const sorted = user.user_palettes.sort(paletteName)

    //const sorted = user.user_palettes.filter(x => x.title === paletteName)
    
    console.log(user.user_palettes.filter(x => x.title === paletteName))

    res.status(200).json({ user })
})*/

filter.get("/user/:id/sort/a-z", async(req, res) => {
    const id = req.params.id 

    const user = await User.findById(id, "-password")

    //console.log(user)

    const sorted = user.user_palettes.sort((a, b) => a.title.localeCompare(b.title))

    /*const sorted = []

    for (var i = 0; i++; i<= user.user_palettes.length) {
        if (user.user_palettes[i].title == )
    }*/

    res.status(200).json({ user, sorted })
    
})

filter.get("/user/:id/sort/z-a", async(req, res) => {
    const id = req.params.id 

    const user = await User.findById(id, "-password")

    const sorted = user.user_palettes.sort((a, b) => b.title.localeCompare(a.title))

    res.status(200).json({ user, sorted })
})

filter.get("/user/:id/sort/newest", async(req, res) => {
    const id = req.params.id 

    const user = await User.findById(id, "-password")
    
    //const sorted = user.user_palettes.sort((a, b) => new Date(a.created_at).localeCompare(new Date(b.created_at)))
    
    const sorted = user.user_palettes.sort(function(a, b){
        return new Date(b.created_at) - new Date(a.created_at)
    })

    res.status(200).json({ user, sorted })
    
})

filter.get("/user/:id/sort/oldest", async(req, res) => {
    const id = req.params.id 

    const user = await User.findById(id, "-password")

    const sorted = user.user_palettes.sort(function(b, a){
        return new Date(b.created_at) - new Date(a.created_at)
    })

    res.status(200).json({ user, sorted })
})

filter.get("/user/:id/sort/biggest", async (req, res) => {
    const id = req.params.id 

    const user = await User.findById(id, "-password")

    const sorted = user.user_palettes.sort(function(a, b){
        //return new Date(b.created_at) - new Date(a.created_at)
        return b.colors.length - a.colors.length
    })

    res.status(200).json({ user, sorted })
})

filter.get("/user/:id/sort/smallest", async(req, res) => {
    const id = req.params.id 

    const user = await User.findById(id, "-password")

    const sorted = user.user_palettes.sort(function(b, a){
        return b.colors.length - a.colors.length 
    })

    res.status(200).json({ user, sorted })

})

module.exports = filter