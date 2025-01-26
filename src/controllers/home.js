class HomeController {
  async index(req, res) {
    res.status(200).json('Connected to the API');
  }
}

export default new HomeController();
