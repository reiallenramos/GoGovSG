import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  AppBar,
  Button,
  Hidden,
  Toolbar,
  createStyles,
  makeStyles,
} from '@material-ui/core'
import i18next from 'i18next'
import GoLogo from '~/assets/go-main-logo.png'
import loginActions from '~/actions/login'

const useStyles = makeStyles((theme) =>
  createStyles({
    masthead: {
      zIndex: '2',
      position: 'relative',
      backgroundColor: '#f0f0f0',
      height: 'auto',
      padding: '4px 0',
      fontSize: '14px',
    },
    mastheadLink: {
      marginLeft: '30px',
      fontFamily: 'lato',
      color: '#484848',
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        color: '#151515',
      },
    },
    mastheadText: {
      marginLeft: '4px',
    },
    mastheadIcon: {
      fontSize: '20px',
      fontFamily: 'sgds-icons !important',
      speak: 'none',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontVariant: 'normal',
      textTransform: 'none',
      lineHeight: 1,
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      '&:before': {
        content: '"\\e948"',
        color: '#db0000',
      },
    },
    appBar: {
      zIndex: '1',
      position: 'relative',
      boxShadow: 'none',
      flexShrink: 1,
      padding: theme.spacing(2, 6, 1),
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(2, 0, 1),
      },
    },
    toolbar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    rowSpace: {
      flexGrow: 0.85,
    },
    appBarSignOutBtn: {
      fill: theme.palette.primary.main,
    },
    appBarSignInBtn: {
      flexGrow: '0.05',
      minWidth: '90px',
    },
    toolbarLogo: {
      width: '130px',
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
        marginBottom: theme.spacing(1),
      },
    },
    logo: {
      display: 'flex',
      width: '100%',
      height: '100%',
    },
  }),
)

const mapStateToProps = (state) => ({
  isLoggedIn: state.login.isLoggedIn,
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(loginActions.logout()),
})

const headers = [
  {
    text: 'Contribute',
    link: i18next.t('general.links.contribute'),
    public: true,
    xsHidden: false,
  },
  {
    text: 'FAQ',
    link: i18next.t('general.links.faq'),
    public: false,
    xsHidden: true,
  },
  {
    text: 'Help us improve',
    link: i18next.t('general.links.contact'),
    public: false,
    xsHidden: true,
  },
]

const BaseLayoutHeader = ({ isLoggedIn, logout }) => {
  const classes = useStyles()

  const appBarBtn = isLoggedIn ? (
    <Button
      onClick={logout}
      size="large"
      color="primary"
      variant="text"
      className={classes.appBarSignOutBtn}
    >
      <strong>Sign out&nbsp;</strong>
      <box-icon name="log-out-circle" />
    </Button>
  ) : (
    <Button
      href="/#/login"
      size="large"
      color="primary"
      variant="contained"
      className={classes.appBarSignInBtn}
    >
      Sign in
    </Button>
  )

  return (
    <AppBar
      position="static"
      color={isLoggedIn ? 'primary' : 'transparent'}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <a href="/#" className={classes.toolbarLogo}>
          <img src={GoLogo} className={classes.logo} alt="GoGovSG Logo" />
        </a>
        <span className={classes.rowSpace} />
        {headers.map(
          (header) =>
            (header.public ? !isLoggedIn : isLoggedIn) && (
              <Hidden xsDown={header.xsHidden} key={header.text}>
                <Button
                  href={header.link}
                  target="_blank"
                  color="primary"
                  size="large"
                  variant="text"
                >
                  {header.text}
                </Button>
              </Hidden>
            ),
        )}
        {appBarBtn}
      </Toolbar>
    </AppBar>
  )
}

BaseLayoutHeader.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseLayoutHeader)