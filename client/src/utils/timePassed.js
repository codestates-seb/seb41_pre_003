const timePassed = (value) => {
  const now = new Date().getTime();
  const created = new Date(value).getTime();
  const time = now - created;
  let timepassed;
  if (time < 1000 * 60) {
    // seconds ago
    timepassed = parseInt(time / 1000);
    if (timepassed === 1) {
      timepassed += ' second';
    } else {
      timepassed += ' seconds';
    }
  } else if (time < 1000 * 60 * 60) {
    // minites ago
    timepassed = parseInt(time / (1000 * 60));
    if (timepassed === 1) {
      timepassed += ' minute';
    } else {
      timepassed += ' minutes';
    }
  } else if (time < 1000 * 60 * 60 * 24) {
    // hours ago
    timepassed = parseInt(time / (1000 * 60 * 60));
    if (timepassed === 1) {
      timepassed += ' hour';
    } else {
      timepassed += ' hours';
    }
  } else if (time < 1000 * 60 * 60 * 24 * 30) {
    // days ago
    timepassed = parseInt(time / (1000 * 60 * 60 * 24));
    if (timepassed === 1) {
      timepassed += ' day';
    } else {
      timepassed += ' days';
    }
  } else if (time < 1000 * 60 * 60 * 24 * 365) {
    // months ago
    timepassed = parseInt(time / (1000 * 60 * 60 * 24 * 30));
    if (timepassed === 1) {
      timepassed += ' month';
    } else {
      timepassed += ' months';
    }
  } else {
    // years ago
    timepassed = parseInt(time / (1000 * 60 * 60 * 24 * 365));
    if (timepassed === 1) {
      timepassed += ' year';
    } else {
      timepassed += ' years';
    }
  }
  return timepassed;
};

export default timePassed;
