import { Router } from "express";

const router = Router();

router.post("/login",async (req,res,next)=>{
    return res.json({message:"login success"});
})

export default router;