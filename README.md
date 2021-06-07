# js.merge
js.merge./yeikos/js.merge
{
js.merge/
yeikos/ js.merge }
Merge(recursive)? merging of (cloned)? objects.
(cloned: objects. }
Install
}
Node.jsshnpm i mergejsimport merge from 'merge'
}
Browser
{ {
<script src="
https://cdn.jsdelivr.net/gh/yeikos/js.merge/dist/merge.browser.min.js">script>
jswindow.merge # API typescript merge(clone: boolean, items: Object[]) merge(...items: Object[]) merge.recursive (clone: boolean, items: Object[]) merge.recursive(...items: Object[]) # Examples .js// Merge {var objectA = {} merge (objectA, { value: 1 }, { str: 'hello world' })var objectB = merge(true, objectA, { value
</script> jswindow.merge} # API typescriptmerge (clone:boolean, items:Object[])merge (...items: Object[])merge .recursive (clone: boolean, items: Object[])merge .recursive(...items: Object[]) # Examples { <script> .js// Merge {var objectA = {} merge (objectA, { value: 1 }, { str: 'hello world' })var objectB = merge(true, objectA, { value
🌟
}}) objectA // { value: 1, str: 'hello world' } objectB // { value: 2, str: 'hello world' }}//Recursive merge{var objectA = {}merge.recursive(objectA, { level: { value: 1 } },{ level: { str: 'hello world' } })var objectB =merge.recursive(true, objectA, level:{ value: 2} } )objectA.level // { value:1,str: 'hello world'} objectB.level //{ value: 2, str: 'hello world' </script> } } # Test ## Node.js sh npm test <script> ## Browser./dist/merge.browser.test.html </script>
