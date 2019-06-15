import { CommentTree } from '@/models';
import {cloneDeep} from 'lodash';

export function buildCommentTree(comments: CommentTree[]): CommentTree[] {
    // init the children list
    comments.forEach(comment => comment.children = []);
    
    // finally I can apply what I have learned in school!!!
    let result = comments.reduce((accumulator: CommentTree[], currentValue: CommentTree) => {
        accumulator.splice(accumulator.findIndex(el => el.id === currentValue.id), 1);
        findAndAttachCommentToParent(accumulator, currentValue);
        return accumulator;
    }, cloneDeep(comments))
    return result;
}

function findAndAttachCommentToParent(comments: CommentTree[], element: CommentTree) {
    if(element.parent === null) {
        comments.push(element);
        return;
    }
    for(let comment of comments) {
        if(comment.id === element.parent) {
            comment.children!.push(element);
            return;
        } 
        findAndAttachCommentToParent(comment.children!, element);
    }
}