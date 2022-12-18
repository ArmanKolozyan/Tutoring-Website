import { db } from "../db.js";

export const getTutoringPosts = (req, res) => {
  let q = "SELECT * FROM tutoring_posts";

  if ((req.query.start !== undefined) && (req.query.end !== undefined)) {
    q = `SELECT * FROM tutoring_posts LIMIT ${req.query.start}, ${req.query.end - req.query.start}`
  }

  db.query(q, (err, data) => {
    if (err) return res.status(500).json({message: "Fetching all tutoring posts failed.", data: []});

    return res.status(200).json({message: "", data: data});
  });
};

export const getSingleTutoringPost = (req, res) => {
  const q =
    "SELECT p.id, `course`, `field_of_study`, `description`, `date`, `experience`, `price`, `free_test`, p.uid, u.firstname FROM users u JOIN tutoring_posts p ON u.id = p.uid WHERE p.id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json({message: "Fetching the specified tutoring post failed.", data: []});

    return res.status(200).json({message: "", data: data[0]});
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
      if (err) return res.status(500).json({message: "Inserting the given tutoring post failed.", data: []});
      post_id = data.insertId;
      callback(req.body.regions, post_id);
      return res.status(200).json({message: "", data: post_id});
    });
  };
  withCallback(insertRegions);
};

const insertRegions = (regions, post_id) => {
  const q1 = `DELETE FROM tutor_regions WHERE post_id = ?`;
  const q2 = "INSERT INTO tutor_regions SET post_id = ?, latitude = ?, longitude = ?, radius = ?";

  db.query(q1, [post_id], (err, data) => {
    if (err) res.status(500).json({message: "Updating the regions failed.", data: []});
  });

  regions.forEach((region) => {
    db.query(q2, [post_id, region.latitude, region.longitude, region.radius], (err, data) => {
      if (err) res.status(500).json({message: "Inserting the regions failed.", data: []});
    });
  });
};

export const getRegions = (req, res) => {
  const q = "SELECT `latitude`, `longitude`, `radius` FROM tutor_regions WHERE post_id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json({message: "Fetching the regions failed.", data: []});
    return res.status(200).json({message: "", data: data});
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
    if (err) return res.status(500).json({message: "Updating the tutoring post failed.", data: []});
  });
  insertRegions(req.body.regions, post_id);
  return res.status(200).json({message: "", data: post_id});
};

export const deleteTutoringPost = (req, res) => {
  const post_id = req.params.id;

  const q = "DELETE FROM tutoring_posts WHERE `id` = ?";

  db.query(q, [post_id], (err, data) => {
    if (err) return res.status(500).json({message: "Deleting tutoring post failed.", data: []});

    return res.status(200).json({message: "Tutoring post is deleted.", data: []});
  });
};

// for the search functionality
export const findTutoringPosts = (req, res) => {
  const keyword = req.query.keyword;
  const course = req.query.course;
  const field = req.query.field;
  const freeTest = req.query.freeTest;

  const checkOrder = () => {
    let order;

    switch (req.query.orderBy) {
      case "Price low-high":
        order = "ORDER BY price ASC";
        break;
      case "Price high-low":
        order = "ORDER BY price DESC";
        break;
      case "Experience high-low":
        order = "ORDER BY experience DESC";
        break;
      case "Experience low-high":
        order = "ORDER BY experience ASC";
        break;
      default:
        order = "";
    }
    return order;
  };

  const checkFreeTest = () => {
    if (freeTest === 'true') {
      return "AND free_test = 1";
    } else {
      return "";
    }
  }

  const checkLimits = () => {
    if ((req.query.start !== undefined) && (req.query.end !== undefined)) {
      return `LIMIT ${req.query.start}, ${req.query.end - req.query.start}`
    } else {
      return "";
    }
  }


  const values = ["%" + keyword + "%", "%" + course + "%", "%" + field + "%", freeTest];
  db.query(
    "SELECT * FROM tutoring_posts WHERE description LIKE ? AND course LIKE ? AND field_of_study LIKE ?" + checkFreeTest() + checkOrder() + checkLimits(),
    values,
    (err, data) => {
      if (err) return res.status(500).json({message: "Finding the tutoring posts failed.", data: []});
      return res.status(200).json({message: "", data: data});
    }
  );
};

export const getTutoringPostsAmount = (req, res) => {
  let q = "SELECT COUNT(id) AS amount FROM tutoring_posts";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json({message: "Fetching the amount of posts failed.", data: []});

    return res.status(200).json({message: "", data: data[0].amount});
  });
  
}
