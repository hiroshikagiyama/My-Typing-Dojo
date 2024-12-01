exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('sentence_list').del();
  await knex('sentence_list').insert(sentenceList);
};

// initial data
const sentenceList = [
  {
    sentence: 'count index length result data value items true false error',
    tag: 'Javascript',
    add_user_id: null,
  },
  {
    sentence:
      'message isActive isLoading isValid isVisible total sum user username password',
    tag: 'Javascript',
    add_user_id: null,
  },
  {
    sentence:
      'email token config options settings params args list array object',
    tag: 'Javascript',
    add_user_id: null,
  },
  {
    sentence: 'map set queue stack input output path url type mode',
    tag: 'Javascript',
    add_user_id: null,
  },
  {
    sentence: 'level temp buffer key value current next prev startTime endTime',
    tag: 'Javascript',
    add_user_id: null,
  },
  {
    sentence: 'function const let if else return for while try catch',
    tag: 'Javascript',
    add_user_id: null,
  },
  {
    sentence:
      'finally throw new class extends constructor super this import export',
    tag: 'Javascript',
    add_user_id: null,
  },
  {
    sentence:
      'default async await Promise resolve reject then map filter reduce',
    tag: 'Javascript',
    add_user_id: null,
  },
  {
    sentence:
      'find includes push pop shift unshift slice splice indexOf findIndex',
    tag: 'Javascript',
    add_user_id: null,
  },
  {
    sentence:
      'toUpperCase Math.floor Math.max Array.isArray JSON.stringify JSON.parse console.log Date.now() setInterval setTimeout',
    tag: 'Javascript',
    add_user_id: null,
  },
  {
    sentence:
      'useState useEffect useContext useCallback useRef createContext props state Route memo',
    tag: 'React',
    add_user_id: null,
  },
  {
    sentence: 'knex select insert update del from table where join leftJoin',
    tag: 'knex',
    add_user_id: null,
  },
  {
    sentence:
      'rightJoin innerJoin groupBy orderBy limit offset count sum avg min',
    tag: 'knex',
    add_user_id: null,
  },
  {
    sentence: 'max distinct returning createTable dropTable alterTable first',
    tag: 'knex',
    add_user_id: null,
  },
  {
    sentence:
      'express app.listen app.get app.post app.put app.delete app.use app.all',
    tag: 'express',
    add_user_id: null,
  },
  {
    sentence:
      'app.use(express.json) res.send res.json res.status req.params req.query req.body req.headers static',
    tag: 'express',
    add_user_id: null,
  },
];
