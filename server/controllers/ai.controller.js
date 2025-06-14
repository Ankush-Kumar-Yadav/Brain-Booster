import generateContent from "../utils/ai.service.js";

export const getReview = async (req, res) => {

  try {
    const code = req.body.code;
    if (!code) {
      return res.status(400).send("Code is required");
    }
  
    const response = await generateContent(code);
  
    res.send(response);
  } catch (error) {
    console.log('error while compiling', error)
  }
};
