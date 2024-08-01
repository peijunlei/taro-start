export const hijackRenderHoc = (WrappedComponent) => {
  return class highHOC extends WrappedComponent {    
    debugger;
     render(){
       if(this.props.main){
         const renderElement = super.render();
         return renderElement;
       }
       return null;
     }
  };
}

export default hijackRenderHoc;