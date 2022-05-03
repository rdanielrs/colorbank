const router = require("express").Router()

const { v4: uuidv4 } = require("uuid")

const User = require("../models/User")

//const { uuid } = require('uuidv4')
const ShortUniqueId = require('short-unique-id');
var uuid = new ShortUniqueId()



const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//const uuidshort = new ShortUniqueId()


//router.use(express.json())

//acessando usuários
router.get("/", async (req, res) => {
    try {
        const users = await User.find() 
        console.log(users)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//leitura dinâmica de dados
router.get("/:id", async (req, res) => {
    //extraindo dado da requisição usando req.params 

    const id = req.params.id 

    try {
        const user = await User.findOne({ _id: id })

        if (!user) {
            res.status(422).json({ message: "Usuário não existente" })
        }

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({ error: error })
    }

})



//adicionando usuários
router.post("/", async (req, res) => {
    const { username, password, confirm_password, user_palettes } = req.body

    if (!username) {
        return res.status(422).json({ msg: "O nome de usuário é obrigatório." })
    }

    if (!password) {
        return res.status(422).json({ msg: "A senha é obrigatória." })
    }

    if (password != confirm_password) {
        console.log("senhas não conferem")
        return res.status(422).json({ msg: "As senhas não conferem." })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        //const user = { id: uuid(), username, password: hashedPassword, user_palettes }
        const user = { username, password: hashedPassword, user_palettes }


        try {
            await User.create(user)
            return res.status(200).json({ msg:"Usuário criado com sucesso" })
        } catch (error) {
            res.status(500).json({ error: error })

        }

        //users.push(User)

        return res.json(User)

    } catch {
        res.status(500).send("Algo deu errado")
    }

})

//logando usuários
router.post("/login", async (req, res) => {
    
    try {
        const user = await User.findOne({ username: req.body.username })

        if (user == null) {
            return res.status(400).send("Não foi possível encontrar o usuário")
        }
    
        try {
            if (await bcrypt.compare(req.body.password, user.password)) {
                //res.send("Você logou com sucesso")

                const secret = process.env.SECRET

                const token = jwt.sign({
                    id: user._id,
                    expires_in: 1209600
                }, secret)

                const userId = user._id

                res.status(200).json({ msg: "Autenticação realizada com sucesso", token, userId})

                console.log("Login realizado com sucesso")
                

            } else {
                res.status(400).send("Senha incorreta")
                console.log("Senha incorreta")
            }

        } catch {
            res.send("Não deu certo.")
            //console.log("teste")
        }

        /*try {
            const secret = process.env.SECRET

            const token = jwt.sign({
                id: user._id
            }, secret)

            res.status(200).json({ msg: "Autenticação realizada com sucesso", token})

        } catch(error) {
            res.status(400).send("Deu merda")
        }*/


    } catch (error) {
        res.status(500).json({ error: error })
    }
})

function checkToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ msg: "Acesso negado!" })
    }

    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret)
        
        //const tokenDecoded = jwt.decode(token, secret)

        //res.status(200).json({ teste: tokenDecoded })

        next()
    } catch (error) {
        res.status(400).json({ msg: "Token inválido." })
    }

}


router.get("/user/:id", checkToken, async (req, res) => {
    const id = req.params.id

    const user = await User.findById(id, "-password")

    if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado" })
    }

    res.status(200).json({ user })

    //console.log("Conectado no banco de dados")
})

router.put("/username/:id", async(req, res) => {
    const id = req.params.id 
    const { newUsername, confirmPassword } = req.body 

    const user = await User.findOne({_id: id})

    if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado." })
    }

    if (!newUsername) {
        console.log("Nome de usuário em falta")
        res.status(400).json({ msg: "Novo nome vazio ou inválido" })
    }

    if (!confirmPassword) {
        console.log("Senha em falta")
        return res.status(400).json({ msg: "Senha incorreta" })
    }

    try {
        if (await bcrypt.compare(req.body.confirmPassword, user.password)) {
            user.username = newUsername
            res.status(200).json({ user })
        } else {
            res.status(400).json({msg: "Senha incorreta"})
            //console.log("Senha incorreta")
        }

        const updatedUser = await User.updateOne({ _id: id }, user)

    } catch(error) {
        res.status(400).json({ msg: "Algo deu errado" })
    }

    //user.password = confirmPassword


})

router.put("/password/:id", async(req, res) => {
    const id = req.params.id 
    const { newPassword, confirmPassword } = req.body 

    const user = await User.findOne({ _id: id })

    if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado." })
    }

    if (!confirmPassword) {
        return res.status(400).json({ msg: "Senha de confirmação em branco ou inválida." })
    }

    if (!newPassword) {
        return res.status(200).json({ msg: "Nova senha em branco ou inválida." })
    }

    try {
        if (await bcrypt.compare(req.body.confirmPassword, user.password)) {
            const hashedPassword = await bcrypt.hash(newPassword, 10)

            user.password = hashedPassword
        }
        res.status(200).json({ user })
    } catch(error) {
        res.status(400).json({ msg: "Senha incorreta." })
    }

    //user.password = confirmPassword

    const updatedUser = await User.updateOne({ _id: id }, user)

})

router.delete("/delete/:id/:confirmPassword", async (req, res) => {
    const id  = req.params.id 
    const confirmPassword = req.params.confirmPassword

    if (!confirmPassword) {
        console.log("Senha não existente")
        res.status(400).json({ msg: "Senha de confirmação inválida ou não existente." })
    }

    const user = await User.findOne({ _id: id })

    try {
        if (await bcrypt.compare(confirmPassword, user.password)) {
            const removedUser = await User.remove({_id: id}, user)
            res.status(200).json({ msg: "Conta removida com sucesso" })
        } else {
            res.status(400).json({ msg: "Senha inválida" })
        }


    } catch(error) {
        //console.log("Erro do catch")
        res.status(400).json({ error })
    }

})


//adicionando itens ao usuário
router.post("/:id", async(req, res) => {
    const id = req.params.id
    const { title, colors } = req.body


    try {
        const user = await User.findOne({ _id: id })
        if (!user) {
            res.status(422).json({ message: "Usuário não existente" })
        }

        var datetime = new Date()

        const colorPalette = { id: uuid(), title, colors, created_at: datetime }
        

        user.user_palettes.push(colorPalette)

        const updatedUser = await User.updateOne({_id: id}, user)

        //console.log(updatedUser)

        res.status(200).json(user)

    } catch(error) {
        res.status(500).json({ error: error })
    }
})


router.delete("/:id/:paletteId", async (req, res) => {
    const id = req.params.id
    const paletteId = req.params.paletteId
    
    
    try {
        const user = await User.findById({ _id: id })
        if (!user) {
            res.status(422).json({ message: "Usuário não existente" })
        }

        const paletteIndex = user.user_palettes.findIndex(x => x.id === paletteId)
        //console.log(user.user_palettes)
        console.log(paletteId)
        //console.log(paletteIndex)

        //console.log(paletteId)
        //user.user_palettes[paletteId].pop()
        if (!paletteIndex) {
            //console.log("Index não encontrado")
            user.user_palettes.splice(0, 1)

        } else {
            user.user_palettes.splice(Number(paletteIndex), 1) 
            //user.user_palettes.splice(0, 1)
            console.log("Item removido com sucesso")
        }
        

        const updatedUser = await User.updateOne({ _id: id }, user)

        res.status(200).json(user)


    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error })
    }

})


module.exports = router