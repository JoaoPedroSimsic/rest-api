class HomeController {
  async index(req, res) {
    res.status(200).json("Connected to the server");
  }
}

export default new HomeController();
