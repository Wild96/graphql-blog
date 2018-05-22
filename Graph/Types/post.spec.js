const {expect} = require('chai');
const {  GraphQLObjectType, GraphQLString } = require( 'graphql');
const Posttype = require ('./post');
describe('Post type testcase',()=>{
    it('should have a _id field',()=>{
        expect(Posttype.getFields()).to.have.property('_id');
        expect(Posttype.getFields()._id.type).to.deep.equals(GraphQLString);
    });
    it('should have a title field',()=>{
        expect(Posttype.getFields()).to.have.property('title');
        expect(Posttype.getFields().title.type).to.deep.equals(GraphQLString);
    });
    it('should have a postcontent field',()=>{
        expect(Posttype.getFields()).to.have.property('postcontent');
        expect(Posttype.getFields().postcontent.type).to.deep.equals(GraphQLString);
    });
    it('should have a username field',()=>{
        expect(Posttype.getFields()).to.have.property('username');
        expect(Posttype.getFields().username.type).to.deep.equals(GraphQLString);
    });
    it('should have a image_path field',()=>{
        expect(Posttype.getFields()).to.have.property('image_path');
        expect(Posttype.getFields().image_path.type).to.deep.equals(GraphQLString);
    });
});