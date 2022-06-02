import { Response, Request } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const { name, email } = request.body;
      const new_user = this.createUserUseCase.execute({ name, email });
      return response.status(201).json(new_user);
    } catch (err) {
      return response.status(400).json({
        error: err.message,
      });
    }
  }
}

export { CreateUserController };
