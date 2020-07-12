import React, { useState, memo } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, IconButton } from '@material-ui/core';
import ExpandIcon from '@material-ui/icons/ExpandMore';

import UserCardContentView from './UserCardContentView';
import UserCardContentEdit from './UserCardContentEdit';
import UserPosts from '../UserPosts/UserPosts';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '80%',
    maxWidth: '800px',
    marginBottom: theme.spacing(2),
    position: 'relative'
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingBottom: `${theme.spacing(1)}px !important`,
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      textAlign: 'left'
    }
  },
  expand: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
}));

const UserCard = (props) => {
  const classes = useStyles();

  const { user } = props;
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  console.log('RENDERING USER: ', user.name); //TODO - remove console.log

  return (
    <Card className={classes.card}>
      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded
        })}
        onClick={toggleExpand}
        aria-expanded={expanded}
        aria-label="show more"
        title="Show More"
      >
        <ExpandIcon />
      </IconButton>

      <CardContent className={classes.cardContent}>
        {!user.updatedUser ? (
          <UserCardContentView
            user={user}
            expanded={expanded}
            edit={props.editUser}
            getPosts={props.getUserPosts}
          />
        ) : (
          <UserCardContentEdit
            user={user.updatedUser}
            expanded={expanded}
            updateField={props.updateUserField}
            save={props.saveUser}
            cancel={props.editUserCancel}
            getPosts={props.getUserPosts}
          />
        )}
        <UserPosts
          posts={user.posts}
          loading={user.loadingState?.fetchPostsInProgress}
          error={user.loadingState?.fetchPostsError}
        />
      </CardContent>
    </Card>
  );
};

export default memo(
  UserCard,
  (prevProps, nextProps) => nextProps.user === prevProps.user
);