const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Project = require('../models/Project')

// @desc    Show add page
// @route   GET /project/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('projects/add')
})


// @desc    Process add form
// @route   POST /projects
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id
        await Project.create(req.body)
        res.redirect('/dashboard')
    } catch(err) {
        console.error(err)
        res.render('error/500')
    }
})


// @desc    Show all projects
// @route   GET /projects
router.get('/', ensureAuth, async (req, res) => {
    try {
        const projects = await Project.find({ status: 'Incomplete' })
            .populate('user')
            .sort({ createdAt: 'desc' })
            .lean()
        
        res.render('projects/index', {
            projects,
        })

    } catch(err) {
        console.error(err)
        res.render('error/500')
    }
})

// @desc    Show single project
// @route   GET /projects/:id
router.get('/:id', ensureAuth, async (req, res) => {
    try {
        let project = await Project.findById(req.params.id)
        .populate('user')
        .lean()

        if(!project)
        {
            return res.render('error/404')
        }

        res.render('projects/show', {
            project
        })
    } catch(err) {
        console.error(err)
        res.render('error/404')
    }
})

// @desc    Show edit page
// @route   GET /projects/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
    try {
        const project = await Project.findOne({
            _id: req.params.id
        }).lean()
    
        if(!project) {
            return res.render('error/404')
        }
    
        if(project.user != req.user.id) {
            res.redirect('/projects')
        } else {
            res.render('projects/edit', {
                project,
            })
        }
    } catch(err) {
        console.error(err)
        return res.render('error/500') 
    }
})


// @desc    Update project
// @route   PUT /projects/edit/:id
router.put('/:id', ensureAuth, async (req, res) => {
    
    try {
        let project = await Project.findById(req.params.id).lean()

        if(!project) { 
            return res.render('error/404')
        }
    
        if(project.user != req.user.id) {
            res.redirect('/projects')
        } else {
            project = await Project.findOneAndUpdate({ _id: req.params.id },
                req.body,
                {  
                    new: true, 
                    runValidators: true
                }
            
        )

            res.redirect('/dashboard')
        }
    } catch(err) {
        console.error(err)
        return res.render('error/500') 
    }
      
})


// @desc    Delete project
// @route   DELETE /projects/:id
router.delete('/:id', ensureAuth, async (req, res) => {
    try { 
        await Project.remove({_id: req.params.id})
        res.redirect('/dashboard')

    } catch(err) {
        console.error(err)
        return res.render('error/500')
    }
})

// @desc    User projects
// @route   GET /projects/user/:userId
router.get('/user/:userId', ensureAuth, async (req, res) => {
   try {
    const projects = await Project.find({
        user: req.params.userId,

    })
    .populate('user')
    .lean()

    res.render('projects/index', {
        projects
    })
   } catch(err) {
       console.error(err)
       res.render('error/500')
   }
})

// @desc    Show task page
// @route   GET /projects/tasks/:id
router.get('/tasks/:id', ensureAuth, async (req, res) => {
    try {
        const project = await Project.findOne({
            _id: req.params.id
        }).lean()
    
        if(!project) {
            return res.render('error/404')
        }
    
        if(project.user != req.user.id) {
            res.redirect('/projects')
        } else {
            res.render('projects/tasks', {
                project,
            })
        }
    } catch(err) {
        console.error(err)
        return res.render('error/500') 
    }
})


// @desc    Update project's tasks
// @route   PUT /projects/tasks/:id
router.put('/tasks/:id', ensureAuth, async (req, res) => {
    
    try {
        let project = await Project.findById(req.params.id).lean()
        

        if(!project) { 
            return res.render('error/404')
        }
    
        if(project.user != req.user.id) {
            res.redirect('/projects')
        } else {
            

            project = await Project.findOneAndUpdate({_id:req.params.id},
                { $push : {tasks : req.body}
                }
                )
        
            
        console.log(req.body)
             
        res.redirect(`/projects/${req.params.id}`)
        }
    } catch(err) {
        console.error(err)
        return res.render('error/500') 
    }
      
})




module.exports = router