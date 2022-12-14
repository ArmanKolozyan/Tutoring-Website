import { db } from "../db.js";

export const getTutoringPosts = (req, res) => {
  const q = "SELECT * FROM tutoring_posts";

  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getSingleTutoringPost = (req, res) => {
  const q =
    "SELECT p.id, `course`, `field_of_study`, `description`, `date`, `experience`, `price`, `free_test`, p.uid, u.firstname FROM users u JOIN tutoring_posts p ON u.id = p.uid WHERE p.id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addTutoringPost = (req, res) => {
  // here we should check authentication

  const q =
    "INSERT INTO tutoring_posts(`course`, `field_of_study`, `description`, `date`, `uid`, `experience`, `price`, `free_test`) VALUES (?)";

  const values = [
    req.body.course,
    req.body.field,
    req.body.desc,
    req.body.date,
    req.user[0].id,
    req.body.exp,
    req.body.price,
    req.body.test,
  ];

  let post_id;

  const withCallback = (callback) => {
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      post_id = data.insertId;
      callback(req.body.regions, post_id);
      return res.status(200).json(post_id)
    });
  };
  withCallback(insertRegions);};

const insertRegions = (regions, post_id) => {
  const q1 = `DELETE FROM tutor_regions WHERE post_id = ?`;
  const q2 = "INSERT INTO tutor_regions SET post_id = ?, latitude = ?, longitude = ?, radius = ?";

  db.query(q1, [post_id], (err, data) => {
    if (err) res.status(500).json(err);
  });

  regions.forEach((region) => {
    db.query(q2, [post_id, region.latitude, region.longitude, region.radius], (err, data) => {
      if (err) res.status(500).json(err);
    });
  });
};

export const getRegions = (req, res) => {
  const q = "SELECT `latitude`, `longitude`, `radius` FROM tutor_regions WHERE post_id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const updateTutoringPost = (req, res) => {
  const post_id = req.params.id;

  const q =
    "UPDATE tutoring_posts SET `course`=?,`field_of_study`=?,`description`=?,`date`=?,`experience`=?,`price`=?, `free_test`=? WHERE `id` = ?";

  const values = [
    req.body.course,
    req.body.field,
    req.body.desc,
    req.body.date,
    req.body.exp,
    req.body.price,
    req.body.test,
    post_id,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
  });
  insertRegions(req.body.regions, post_id);
  return res.status(200).json(post_id)
};


export const deleteTutoringPost = (req, res) => {
  const post_id = req.params.id;

  const q =
    "DELETE FROM tutoring_posts WHERE `id` = ?";

  
    db.query(q, [post_id], (err, data) => {
      if (err) return res.status(403);

      return res.json("Post is deleted!");
    });   

}
