import Detail from '../models/detail.model.js';



export const getDetailById = async(req, res) =>{
  try {
      const response = await Detail.findOne({
          where:{
              id: 1
          }
      });
      res.status(200).json(response);
  } catch (error) {
      console.log(error.message);
  }
}





export const updateDetailById = async(req, res) =>{
  try {
      await Detail.update(req.body,{
          where:{
              id: 1
          }
      });
      res.status(200).json({msg: "Data Updated"});
  } catch (error) {
      console.log(error.message);
  }
}