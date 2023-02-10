export const styles = {
  container: {
    height: 390,
    width: '100%',
    position: 'relative',
  },
  player: {
    iframe: {
      textAlign: 'center',
      marginTop: 30,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    layer: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      cursor: 'pointer'
    }
  },
  placeholder: {
    absolute: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    audioDisabled: {
      backgroundColor: 'rgba(0,0,0,0.1)',
      cursor: 'pointer',
      maxWidth: '100%',
      width: 700,
      height: 390,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    resume: {
      cursor: 'pointer',
      width: '50%',
      height: 200,
      top: '50%'
    },
    restart: {
      left: '50%'
    }
  }
}