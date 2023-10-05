const Write = () => {
  return(
    <div className="p-20">
      <h4>글작성</h4>
      <form action="api/write" method="POST">
        <input type="text" name="title"/><br/>
        <input type="text" name="content"/>
        <button type="submit">버튼</button>
      </form>
    </div>
  )
}

export default Write;