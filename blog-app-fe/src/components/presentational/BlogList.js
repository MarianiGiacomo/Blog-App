import { React, connect, Link, PropTypes, Table, styles, filterBlogs } from '../../imports'

const BlogList = (props) => {
  const { blogs, login } = props

	return (
		<>
			<h2>Your blogs</h2>
			{ filterBlogs(blogs, login).length
				? 
				<Table striped celled style={styles.table}>
					<Table.Body>
						{filterBlogs(blogs, login).sort((a, b) => a.likes - b.likes).map((blog, i) =>
							<Table.Row key={i}>
								<Table.Cell>
									<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
								</Table.Cell>
							</Table.Row>
						)}
					</Table.Body>
				</Table>
				: 
				<p>You don&apos;t have any blogs yet</p>
			}
			<h2>All blogs</h2>
			{ blogs.length
				?
				<Table striped celled style={styles.table}>
					<Table.Body>
						{
							blogs.sort((a, b) => a.likes - b.likes).map((blog, i) =>
								<Table.Row key={i}>
									<Table.Cell>
										<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
									</Table.Cell>
								</Table.Row>
							)}
					</Table.Body>
				</Table>
				:
				<p>There are no blogs yet</p>
			}
		</>
	)
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    login: state.login,
  }
}

BlogList.propTypes = {
  login: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
}

export default connect(
  mapStateToProps,
  null
)(BlogList)