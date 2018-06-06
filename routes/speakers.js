import { Router } from 'express';
import Speaker from '../models/speaker';
const router = Router();

router.get('/', (req, res, next) => {
  Speaker.find().then(speakers => {
      speakers = speakers || [];
      res.status(200).send(speakers.map(speaker => decorateSpeaker(req, speaker)));
    })
    .catch(err => {
      res.status(500).send({ code: 'Internal Error', message: err.message });
    });
});

router.get('/:id', (req, res, next) => {
  Speaker.findById(req.params.id).then(speaker => {
    if (!speaker) {
      res.status(404).send({ code: 'ResourceNotFound', message: 'No speaker with id ' + req.params.id + ' was found.' });
      return next;
    }
    res.status(200).send(decorateSpeaker(req, speaker));
  })
  .catch(err => {
    res.status(500).send({ code: 'InternalError', message: err });
  });
});

let decorateSpeaker = (req, speaker) => {
  let reqUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;
  let links = {
    links: [{
      rel: 'self',
      href: `${reqUrl}/${speaker._id}`
    }, {
      rel: 'parent',
      href: `${reqUrl}`
    },{
      rel: 'root',
      href: `${req.protocol}://${req.get('host')}`
    }]
  }
  let decoratedSpeaker = Object.assign({}, speaker.toObject(), links);
  return decoratedSpeaker
}

export default router;