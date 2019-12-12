#!/bin/zsh
source ~/.zshrc

echo "Publishing to alexmatson..."
hugo --quiet --environment alexmatson
cd public/
tar czf - * | ssh-alexmatson "cd ${1}; tar xzf -"

cd ..

echo "Publishing to atauno..."
hugo --quiet --environment atauno
cd public/
tar czf - * | ssh-atauno "cd ${2}; tar xzf -"

cd ..
echo "DONE"