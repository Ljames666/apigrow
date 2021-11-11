import express, { Request, Response, Router } from "express";
import Growdever, { Return, create, update, remove, get } from "./growdever";

const routes = express.Router();

routes.use((req: Request, res: Response, next) => {
    console.log(
        `Request from ${req.socket.remoteAddress ?? "null-ip"} on ${
            req.originalUrl
        }`
    );

    next();
});

routes.post("/", (req, res) => {
    let { nome, idade, turma, techs, cidade } = req.body;

    let createdGrowdever: Return = create(nome, idade, turma, techs, cidade);
    if (!createdGrowdever.ok) {
        return res.status(400).send({
            ok: false,
            message: createdGrowdever.message,
        });
    }

    return res.status(201).send({
        ...createdGrowdever,
    });
});

routes.put("/:id", (req, res) => {
    let { idade, techs } = req.body;
    let id = req.params.id;

    let updatedGrowdever: Return = update(id, idade, techs);

    if (!updatedGrowdever.ok) {
        return res.status(400).send({
            ...updatedGrowdever,
        });
    }

    return res.status(200).send({
        ...updatedGrowdever,
    });
});

routes.delete("/:id", (req, res) => {
    let id = req.params.id;

    let removedGrowdever: Return = remove(id);

    if (!removedGrowdever.ok) {
        return res.status(400).send({
            ...removedGrowdever,
        });
    }

    return res.status(200).send({
        ...removedGrowdever,
    });
});

routes.get("/", async (req, res) => {
    let { turma } = req.query;

    let growdevers = await get(parseInt(turma as string));

    return res.send({
        ...growdevers,
    });
});

export default routes;
